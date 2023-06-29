import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { GradientBackgroundCon } from '@/components/QuoteGenerator/QuoteGeneratorElements'



export default function Home() {
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
        
      </GradientBackgroundCon>
    </>
  )
}
