import Image from 'next/image'
import Link from 'next/link'
import hero from '../images/hero.jpg';
import rappers from '../images/rappers.png';
import {useState ,useEffect} from 'react';
import { useRouter } from 'next/router'


export default function Home() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();
	const { success, canceled } = router.query;

	useEffect(() => {
		if (success !== undefined || canceled !== undefined) {
			if (success) {
				console.log(
					'Order placed! You will receive an email confirmation.'
				);
			}

			if (canceled) {
				console.log(
					'Order canceled -- continue to shop around and checkout when you’re ready.'
				);
			}
		}
	}, [success, canceled]);

  const submitForm = async (e) => {
    e.preventDefault();
    console.log({ name, email, purpose, message })

    const paymentRes = await fetch('/api/checkout_sessions', {
      method: 'POST',
      
    });
    console.log("response payment", paymentRes)
 
    // const res = await fetch('http://localhost:3000/api/submit-form', {
    //   method: 'POST',
    //   body: JSON.stringify({ name, email, purpose, message }),
    // });
    // Success if status code is 201
    // if (res.status === 201) {
    //   toast('Thank you for contacting us!', { type: 'success' });
    // } else {
    //   toast('Please re-check your inputs.', { type: 'error' });
    // }
  };
  return (
    <>
      <div className="bg-gray-200 ">
        <div className="container px-6 py-4 mx-auto lg:flex lg:h-128 lg:py-16 ">
          <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
            <div className="max-w-lg">
              <h2 className="text-xl tracking-wide text-white text-pink-800 lg:text-3xl lg:text-4xl">
                Big Art
              </h2>
              <h1 className="text-xl tracking-wide text-white text-gray-800 lg:text-1xl lg:text-2xl">
                We are Looking for New Talents
              </h1>
              <p className="mt-4 text-gray-300 text-gray-600">
                If you sing good song, apply for an upcoming auditions conducted by Big Art Team. This forum will give you an opportunity in the singing area. This audition process is started by Filling an Online Form , Send Your Detail and short Audio Clip. We will select 1000 Newly Talented singers for auditions. More Information will Provided soon.
              </p>

              <p className="mt-4 text-gray-300 text-gray-600"> For Any Enquiry Feel free to drop us a message</p>
              <div className="mt-6">
                <Link href="/audition">
                  <a
                    className="inline-block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-800"
                  >   Fill Audition Form </a>
                </Link>
                <Link href="/contact">
                  <a
                    className="inline-block px-3 mx-4 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-800"
                  >   Contact Us </a>
                </Link>

              </div>

            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-2 lg:h-96 lg:w-1/2">
            <Image

              src={hero}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>

      {/* about  */}
      <div className='my-10 px-5 lg:px-50 xl:px-60'>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              You will have two advantages by auditioning here.
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              1. You will get a chance to make your mark. And after your name becomes famous, you will get work.
              2. After the result of this audition you will know whether you are worthy of going to big TV reality show or not.
            </p>

          </li>
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              This important information for new singers
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              If you are a new artist and are looking for a good stage to audition. And If you want to give a singing auditions. Our platform may prove to be the best for you. We audition all those who are new or old singers. they are interested in singing and want to make a career in the singing platform. The audition process is online , That means you can audition through the online phone sitting in the house.
            </p>
            <Image

              src={rappers}
              alt="Picture of the rappers"
            />
          </li>
          <li className="ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How to give online auditions?
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              You can give this singing audition through your phone sitting at home. If you think you are a good singer. And you can move forward in the field of singing. So you can give this audition. The process of auditioning online is very simple.
            </p>
            <Link href="/audition">
              <a
                className="inline-block px-3 py-2 my-4 font-semibold text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-800"
              >   Fill Audition Form </a>
            </Link>

          </li>
          

        </ol>

      </div>


    </>
  )
}
