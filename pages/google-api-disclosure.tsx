import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function GoogleDisclosure() {
  return(
    <>
      <Header />
      <Container className="pt-8 h-4/6 flex-col justify-center">
        <h1 className="font-extrabold text-center text-2xl text-[#5564af]">Google API Disclosure</h1>
        <br />
        <br />
        <p>
          Kestela use and transfer of information received from Google APIs to any other app will adhere to <a className='font-semibold text-[#5564af]' href='https://developers.google.com/terms/api-services-user-data-policy' target='_blank'>Google API Services User Data Policy</a>, 
          including the Limited Use requirements.
        </p>
      </Container>
      <Footer />      
    </>
  )
}