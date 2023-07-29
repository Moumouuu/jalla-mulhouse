interface EmailTemplateProps {
  firstName: string;
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
}

export const EmailTemplate = ({
  firstName,
  name,
  phoneNumber,
  email,
  message,
}: any) => (
  <div>
    <h1>
      Vous venez de recevoir un E-mail de {firstName} {name} !
    </h1>
    <span>
      <span className="underline">E-Mail :</span>
      {email}
    </span>
    <span>
      <span className="underline">Téléphone :</span> {phoneNumber}
    </span>
    <span>
      <span className="underline">Message :</span> {message}
    </span>
  </div>
);
