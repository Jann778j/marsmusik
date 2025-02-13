import "../styles/Ticketholder.module.scss";
import { useRef } from "react";
import { useState } from "react";

function TicketHolderVIP(props) {
  const ticketHolderForm = useRef(null);
  //giver besked "thank you" når der trykket submit på knap
  const [sent, setSent] = useState(false);
  const [txt, setTxt] = useState("");

  function submit(e) {
    e.preventDefault();
    props.setTicketHolders((current) => [
      ...current,
      {
        fullname: ticketHolderForm.current.elements.fullname.value,
        email: ticketHolderForm.current.elements.email.value,
        tickettype: "VIP",
      },
    ]);
    setSent(true);
    console.log(props.ticketHolders);
  }

  if (sent) {
    return (
      <>
        <div className="thankyou">
          <h2>Thank you!</h2>
          <p>- info sent</p>
        </div>
      </>
    );
  }

  // validate name
  const onInputChange = (e) => {
    const { value } = e.target;
    // console.log("Input value: ", value);

    const re = /^[A-ø a-ø]+$/;
    if (value === "" || re.test(value)) {
      setTxt(value);
    }
  };

  return (
    <>
      <div className="formticketholder">
        <h3>VIP ticket</h3>
        <form id="ticketholderform" onSubmit={submit} ref={ticketHolderForm}>
          <label htmlFor="fullname">
            {" "}
            Full name
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              required
              onChange={onInputChange}
              value={txt}
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
              aria-describedby="hint-mail"
              required
            />
            <span className="error" id="err-mail" aria-live="assertive">
              Type in your email address
            </span>
          </label>
          <button className="submitBtn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default TicketHolderVIP;
