import React, {useState, useEffect} from 'react'


//Material UI imports

import { Backdrop, Fade, Modal } from '@mui/material'
import { ModalCircularProgress, QuoteGeneratorModalCon, QuoteGeneratorModalInnerCon, QuoteGeneratorSubTittle, QuoteGeneratorTittle } from './QuoteGeneratorElements';
import ImageBlob from '../animations/ImageBlob';
import { ImageBlobCon } from '../animations/AnimationElements';
import AnimatedDownloadButton from '../animations/AnimatedDownloadButton';


interface QuoteGeneratorModalProps{
    open: boolean,
    close: () => void;
    processingQuote: boolean;
    setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>;
    quoteReceived: String | null;
    setQuoteReceived: React.Dispatch<React.SetStateAction<String | null>>;
}

const style = {

};


const QuoteGeneratorModal = ({
    open,
    close,
    processingQuote,
    setProcessingQuote,
    quoteReceived,
    setQuoteReceived,
}: QuoteGeneratorModalProps)  => {
    const wiseDevQuote = '"La paciencia es necesaria, y no se puede cosechar de inmediato donde se ha sembrado."';
    const wiseDevQuoteAuthor = "- Soren Kierkegaard";


    const [blobUrl, setBlobUrl] = useState<string | null>(null);

    //FUncion de la descarga de la tarjeta

    const handleDownload = () => {
        const link = document.createElement('a');
        if (typeof blobUrl == 'string'){
            link.href = blobUrl;
            link.download = 'quote.png';
            link.click();

        }
    }

    //Function: handle the receiving of quote card
    useEffect(() => {
        if (quoteReceived) {
            const binaryData = Buffer.from(quoteReceived, 'base64');
            const blob = new Blob([binaryData], { type: 'image/png' });
            const blobUrlGenerated = URL.createObjectURL(blob);
            console.log(blobUrlGenerated);
            setBlobUrl(blobUrlGenerated);

            return () => {
                URL.revokeObjectURL(blobUrlGenerated);
            }
        }
    }, [quoteReceived])

    
    return(
       <Modal
            id="QuoteGeneratorModal"
            aria-labelledby="spring-modal-quotegeneratormodal"
            aria-describedby="spring-modal-opens-and-closes-quote-generator"
            open={open}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
       >
            <Fade in={open}>
                <QuoteGeneratorModalCon sx={style}>
                    <QuoteGeneratorModalInnerCon>
                        {/*State #1: Processing request of quote + quote state is empty*/}
                        { (processingQuote === true && quoteReceived === null) && 
                            <>
                                <ModalCircularProgress
                                    size={"8rem"}
                                    thickness={2.5}
                                />
                                <QuoteGeneratorTittle>
                                    Pensando tu quote...
                                </QuoteGeneratorTittle>
                                <QuoteGeneratorSubTittle style={{marginTop: "20px"}}>
                                    {wiseDevQuote}
                                    <br></br>
                                    <span style={{fontSize: 26}}>{wiseDevQuoteAuthor}</span>

                                </QuoteGeneratorSubTittle>
                            </>
                        } 

                        {/*State #2: Quote state fulfilled*/}
                        {quoteReceived !== null &&
                            <>
                                <QuoteGeneratorTittle>
                                    Llevalo contigo ❤︎
                                </QuoteGeneratorTittle>

                                <QuoteGeneratorSubTittle style={{marginTop: "20px"}}>
                                    Una vista previa? 
                                </QuoteGeneratorSubTittle>
                                <ImageBlobCon>
                                    <ImageBlob
                                    quoteReceived={quoteReceived}
                                    blobUrl={blobUrl}
                                    />

                                </ImageBlobCon>
                                <AnimatedDownloadButton
                                    handleDownload={handleDownload}
                                />
                            </>
                        }

                    </QuoteGeneratorModalInnerCon>
                </QuoteGeneratorModalCon>
            </Fade>
       </Modal>
    )
}

export default QuoteGeneratorModal