import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import { useS3Upload } from 'next-s3-upload'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
export default function Audition () {
  const [loading, setLoading] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [videoUrl, setVideoUrl] = useState()
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()
  const [dataSave, setdataSave] = useState(true)
  const [paymentSuccess, setpaymentSuccess] = useState(undefined)

  function randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const id = String(randomInteger(10000, 99999))

  let handleFileChange = async file => {
    setLoading('loading')
    let { url } = await uploadToS3(file)
    setVideoUrl(url)
    setLoading('done')
    console.log(url)
  }
  const router = useRouter()
  const { success, canceled } = router.query

  useEffect(() => {
    if (
      success !== undefined ||
      canceled !== undefined ||
      paymentSuccess !== undefined
    ) {
      if (success) {
        console.log('Order placed! You will receive an email confirmation.')
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('payment', 'Done')
        }
        const submitForm = async () => {
          const res = await fetch('/api/submit-form', {
            method: 'POST',
            body: JSON.stringify({
              name: window.localStorage.getItem('name'),
              email: window.localStorage.getItem('email'),
              phoneNumber: window.localStorage.getItem('phoneNumber'),
              address: window.localStorage.getItem('address'),
              gender: window.localStorage.getItem('gender'),
              age: window.localStorage.getItem('age'),
              videoUrl: window.localStorage.getItem('videoUrl'),
              payment: window.localStorage.getItem('payment')
            })
          })
          // Success if status code is 201
          if (res.status === 201) {
            setpaymentSuccess('success')
            localStorage.clear();
          } else {
            setpaymentSuccess('fail')
            localStorage.clear();
          }
        }
        submitForm()
      }

      if (canceled) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('payment', 'Fail')
        }
        setpaymentSuccess('fail')
        localStorage.clear();
      }
    }
  }, [success, canceled, paymentSuccess, setpaymentSuccess])

  const setFromStorage = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
      window.localStorage.setItem('phoneNumber', phoneNumber)
      window.localStorage.setItem('gender', gender)
      window.localStorage.setItem('age', age)
      window.localStorage.setItem('videoUrl', videoUrl)
      window.localStorage.setItem('address', address)
      window.localStorage.setItem('payment', 'Not Done')
    }
    setdataSave(false)
  }

  // const submitForm = async e => {
  //   e.preventDefault()
  //   console.log({ name, email, phoneNumber, gender, age, videoUrl, id })

  //   const res = await fetch('/api/submit-form', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       phoneNumber,
  //       address,
  //       gender,
  //       age,
  //       videoUrl,
  //       id
  //     })
  //   })
  //   // Success if status code is 201
  //   if (res.status === 201) {
  //     toast('Thank you for contacting us!', { type: 'success' })
  //   } else {
  //     toast('Please re-check your inputs.', { type: 'error' })
  //   }
  // }

  if (paymentSuccess == undefined) {
    return (
      <>
        <div className='py-20 space-y-10 px-10 lg:px-80 bg-gray-100'>
          <h2 className='text-4xl font-semibold'>Audition Form</h2>
          <p>
            You can give this singing audition through your phone sitting at
            home. Friends, if you really think that you are a good singer and
            you can go ahead then only give this audition otherwise you can
            leave it.
          </p>
          <p>
            If you think you are a good singer then you can give this audition.
            This audition process is online
          </p>

          <div className='grid xl:grid-cols-2 xl:gap-6'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='text'
                name='floating_first_name'
                id='floating_first_name'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required=''
                onChange={e => setName(e.target.value)}
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setphoneNumber(e.target.value)}
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
                onChange={e => setAddress(e.target.value)}
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
                onChange={e => setGender(e.target.value)}
              >
                <option defaultValue={'gender'}>Choose Gender</option>
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
                onChange={e => setAge(e.target.value)}
              />
              <label
                htmlFor='floating_company'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Age
              </label>
            </div>
          </div>

          <FileInput onChange={handleFileChange} />
          <div className='relative z-0 w-full mb-6 group'>
            {!loading ? (
              <>
                <button
                  className='inline-block align-middle m-auto table text-white text-center bg-gray-800 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={openFileDialog}
                >
                  Upload Video
                </button>
              </>
            ) : (
              <div className='flex justify-center'>
                <div
                  className={`flex p-4 mb-4 text-sm text-yellow-700 ${
                    loading == 'done'
                      ? 'text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'
                      : 'bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800'
                  }  w-1/2`}
                  role='alert'
                >
                  <svg
                    className='inline flex-shrink-0 mr-3 w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <div>
                    <span className='font-medium'>Video Upload Status </span>
                    {loading
                      ? loading == 'done'
                        ? 'Video upload done'
                        : 'Uploading a video'
                      : 'Please upload ad video'}
                  </div>
                </div>
              </div>
            )}
          </div>
          {dataSave ? (
            <button
              onClick={setFromStorage}
              className='inline-block align-middle m-auto table text-white text-center bg-gray-800 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Submit
            </button>
          ) : (
            <form action={`/api/checkout_sessions/${id}`} method='post'>
              <button
                type='submit'
                className='inline-block align-middle m-auto table text-white text-center bg-gray-800 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Checkout Payment
              </button>
            </form>
          )}
        </div>
      </>
    )
  } else if (paymentSuccess == 'success') {
    return (
      <div
        className='p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'
        role='alert'
      >
        <span className='font-medium'>Success alert!</span> Change a few things
        up and try submitting again.
      </div>
    )
  } else {
    return (
      <div
        className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
        role='alert'
      >
        <span className='font-medium'>Danger alert!</span> Change a few things
        up and try submitting again.
      </div>
    )
  }
}
