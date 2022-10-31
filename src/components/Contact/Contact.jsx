import React from 'react'
import toast from 'react-hot-toast';
import './contact.css'
const Contact = () => {


	return (
		<>
		<div id='form'>
		<article className="pa4 black-80mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
  <form action="https://formforsite.com/send/cGl5dXNoeWFkYXYwMTkxQGdtYWlsLmNvbQ" method="POST" acceptCharset="utf-8">
	<input name="_success-page-redirect" type="hidden" value="http://localhost:3000" />
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email-address">Name</label>
			<input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name"  id="name" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" />
      </div>
			<div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email-address">Message</label>
        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="message"  id="message" />
      </div>
    </fieldset>
    <div className="mt3">
			<input className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Send Me" />
			</div>
  </form>
</article>
		</div>
	

		</>
	)
}

export default Contact