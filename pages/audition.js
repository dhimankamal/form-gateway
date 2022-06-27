import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import { useS3Upload } from 'next-s3-upload';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
export default function Audition () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  let handleFileChange = async file => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  const router = useRouter()
  const { success, canceled } = router.query

  useEffect(() => {
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log('Order placed! You will receive an email confirmation.')
      }

      if (canceled) {
        console.log(
          'Order canceled -- continue to shop around and checkout when you’re ready.'
        )
      }
    }
  }, [success, canceled])

  const submitForm = async e => {
    e.preventDefault()
    console.log({ name, email,phoneNumber,gender })

    // const paymentRes = await fetch('/api/checkout_sessions', {
    //   method: 'POST'
    // })
    // console.log('response payment', paymentRes)

    const res = await fetch('http://localhost:3000/api/submit-form', {
      method: 'POST',
      body: JSON.stringify({ name, email,phoneNumber,address,gender }),
    });
    // Success if status code is 201
    if (res.status === 201) {
      toast('Thank you for contacting us!', { type: 'success' });
    } else {
      toast('Please re-check your inputs.', { type: 'error' });
    }
  }
  return (
    <>
     <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>

      {imageUrl && <img src={imageUrl} />}
    </div>
      <div className='py-20 space-y-10 px-10 lg:px-80 bg-gray-100'>
        <h2 className='text-4xl font-semibold'>Audition Form</h2>
        <p>
          You can give this singing audition through your phone sitting at home.
          Friends, if you really think that you are a good singer and you can go
          ahead then only give this audition otherwise you can leave it.
        </p>
        <p>
          If you think you are a good singer then you can give this audition.
          This audition process is online
        </p>
        <form >
          <div className='grid xl:grid-cols-2 xl:gap-6'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='text'
                name='floating_first_name'
                id='floating_first_name'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required=''
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor='floating_first_name'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Name
              </label>
            </div>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='email'
                name='floating_email'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required=''
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor='floating_email'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Email address
              </label>
            </div>
          </div>
          <div className='grid xl:grid-cols-2 xl:gap-6'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='tel'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                name='floating_phone'
                id='floating_phone'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required=''
                onChange={(e) => setphoneNumber(e.target.value)}
              />
              <label
                htmlFor='floating_phone'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Phone Number
              </label>
            </div>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='text'
                name='floating_company'
                id='floating_company'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required=''
                onChange={(e) => setAddress(e.target.value)}
              />
              <label
                htmlFor='floating_company'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Address
              </label>
            </div>
            <div className='relative z-0 w-full mb-6 group'>
              <select
                type='text'
                name='floating_company'
                id='floating_company'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required=''
                onChange={(e) => setGender(e.target.value)}
              >
                {' '}
                <option selected>Choose Gender</option>
                <option value={'male'}>Male</option>
                <option value={'female'}>Female</option>
              </select>
              <label
                htmlFor='floating_company'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Gender
              </label>
            </div>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='text'
                name='floating_company'
                id='floating_company'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required=''
                onChange={(e) => setAge(e.target.value)}
              />
              <label
                htmlFor='floating_company'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Age
              </label>
            </div>
            <div className='relative z-0 w-full mb-6 group'>
              <>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  htmlFor='user_avatar'
                >
                  Upload Audio Not More Than 1 Minute
                </label>
                <input
                  className=' w-full m-auto table text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                  aria-describedby='user_avatar_help'
                  id='user_avatar'
                  type='file'
                  accept='video/*'
               
                />
                {/*   <div
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="user_avatar_help"
                >
                  A profile picture is useful to confirm your are logged into your account
                </div> */}
              </>
            </div>
          </div>
          <button
            onClick={submitForm}
           
            className='inline-block align-middle m-auto table text-white text-center bg-gray-800 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
