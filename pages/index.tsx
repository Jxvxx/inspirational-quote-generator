import React, {useEffect, useState} from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'


// Componentes

import { BackgroundImage1, BackgroundImage2, FooterCon, FooterLink, GenerateQuoteButton, GenerateQuoteButtonText, GradientBackgroundCon, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorSubTittle, QuoteGeneratorTittle } from '@/components/QuoteGenerator/QuoteGeneratorElements'

//Assets

import Clouds1 from '../assets/cloud-and-thunder.png'
import Clouds2 from '../assets/cloudy-weather.png'
import { API } from 'aws-amplify'
import { quotesQueryName } from '@/src/graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'


//interface para DynamoDB object
interface UpdateQuouteInfoData{
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}

//Type guard for fetch function
function isGraphQLResultForquotesQueryName(response: any): response is GraphQLResult<{
  quotesQueryName:{
    items:[UpdateQuouteInfoData];
  };
}>{
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}




export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);

//Function to fetch our DynamoDB object (quotes generated)
const updateQuoteInfo = async () => {
  try{
    const response = await API.graphql<UpdateQuouteInfoData>({
      query: quotesQueryName,
      authMode: "AWS_IAM",
      variables: {
        queryName: "LIVE"

      },
    })
    console.log('response', response);
    //setNumberOfQuotes(response.data.quotesQueryName.items[0].quotesGenerated);

    //Type guards
    if(!isGraphQLResultForquotesQueryName(response)){
      throw new Error('Unexpected response from API.graphql');
    }
    if(!response.data){ 
      throw new Error('Response data is undefined');
    }

    const recivedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated;
    setNumberOfQuotes(recivedNumberOfQuotes);





  }catch (error){
    console.log('error getting quote data', error)
  }

}

useEffect(() => {
  updateQuoteInfo();

}, [])


  return (
    <>
      <Head>
        <title>Generador de Frases Motivadoras</title>
        <meta name="description" content="Porque la salud mental importa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*Background*/}
      <GradientBackgroundCon>
        j


        {/*Quote Modal*/}

        {/*Quote Generator Modal Pop-Up*/}
        {/*<QuoteGeneratorModal
        />*/}


        {/*Quote Generador*/}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTittle>
              Generador de inspiracion Diaria
            </QuoteGeneratorTittle>
            <QuoteGeneratorSubTittle>

            Porque la salud mental importa. Genera un quote aleatorio de inspiracion! usando <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
              
            </QuoteGeneratorSubTittle>

            <GenerateQuoteButton>
              <GenerateQuoteButtonText 
              //onClick={null}
              >
                Genera un Quote
              </GenerateQuoteButtonText>
            </GenerateQuoteButton>

          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>






        {/*Background */}
        <BackgroundImage1
          src={Clouds1}
          height="300"
          alt="cloudybackground1"/>

        <BackgroundImage2
          src={Clouds2}
          height="300"
          alt="cloudybackground1"/>

        {/*FOoter*/}

        <FooterCon>
          <>
            Quotes Generados: {numberOfQuotes}
            <br/>
            Desarrollado por <FooterLink href="https://twitter.com/G____Gr" 
            target="_blank" rel="noopener
            noreferrer"> Javier Salas🤑🤑</FooterLink>
          
          </>
        </FooterCon>




      </GradientBackgroundCon>
    </>
  )
}
