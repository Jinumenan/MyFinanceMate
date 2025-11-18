import React, { useState } from 'react';

export default function UserContact() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill all the fields");
      return;
    }

    const formData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      access_key: "e0d9b263-5aa5-43d8-a41f-07d6bd8d3bd6"
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Message Sent! Thank you for contacting us.");
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError("Failed to send message, please try again.");
      }
    } catch (err) {
      setError("Something went wrong, please try again later.");
    }
  };

  return (
    <form onSubmit={onSubmit} id='contact'>
      <div className='w-auto h-auto pb-10'>
        <div className='flex'>
          <div className='flex-1 justify-items-center pb-40 pl-10'>
            <div className='w-auto h-auto pt-60'>
              <h2 className='text-[45px] mb-4 pl-4 font-sans font-bold antialiased text-[#8da242] '>Contact Us</h2>
              <span className='text-sm pl-4 font-semibold font-sans'>Reach out to us for any queries.</span><br />
            </div>
          </div>
          <div className='flex-1'>
            <div className='pt-20'>
              <div className='flex flex-col pr-60'>
                <label className='m-3'>Name</label>
                <input
                  className='outline-none border border-slate-300 p-2 rounded-md border-b-2'
                  type="text"
                  name='name'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim()) setError('');
                  }}
                  placeholder='Name'
                  autoComplete="off"
                />
              </div>
              <div className='flex flex-col pr-60'>
                <label className='m-3'>Email</label>
                <input
                  className='outline-none border border-slate-300 p-2 rounded-md border-b-2'
                  type="email"
                  name='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.trim()) setError('');
                  }}
                  placeholder='Email'
                  autoComplete="off"
                />
              </div>
              <div className='flex flex-col pr-60'>
                <label className='m-3'>Message</label>
                <textarea
                  className='outline-none border border-slate-300 p-2 rounded-md border-b-2 h-[100px]'
                  name='message'
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (e.target.value.trim()) setError('');
                  }}
                  placeholder='Message'
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="text-red-600 mt-2 pl-3 font-semibold">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-600 mt-2 pl-3 font-semibold">
                  {success}
                </div>
              )}

              <div>
                <button className='get-btn mt-4' type='submit'>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
