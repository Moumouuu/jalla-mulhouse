import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  message,
}) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-2">Nouveau message reçu</h2>
    <p className="mb-4">
      Vous avez reçu un nouveau message de{" "}
      <strong>
        {firstName} {lastName}
      </strong>
      .
    </p>
    <div className="mb-4">
      <strong>Coordonnées de l&apos;expéditeur :</strong>
      <p className="mt-2">
        Adresse e-mail : {email}
        <br />
        Numéro de téléphone : {phoneNumber}
      </p>
    </div>
    <div className="mb-4">
      <strong>Message :</strong>
      <p className="mt-2">{message}</p>
    </div>
  </div>
);
