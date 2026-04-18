import { IonPage, IonContent, IonButton, IonCard, IonCardContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { t, Language } from '../services/translations';

import "./SchemeDetail.css"; // 👈 add this

const SchemeDetail: React.FC = () => {
  const history = useHistory();

  const { lang, speak } = useContext(AppContext) as {
    lang: Language;
    speak: (text: string) => void;
  };

  return (
    <IonPage>
      <IonContent className="detail-page">

        {/* Header */}
        <div className="detail-header">
          <h2>PM Vaya Vandana Yojana</h2>
          <p>Monthly pension scheme for senior citizens.</p>
        </div>

        {/* Info Card */}
        <IonCard className="detail-card">
          <IonCardContent>

            <p>
              The Government of India comes up with a number of social security schemes every now and then based on the need of the hour. Public Provident Fund (PPF), Atal Pension Yojana, National Pension Scheme, Senior Citizens Saving Scheme, and many other schemes are already functional for years now.

They are popular among those who are planning and managing their retirement. A new addition to the list is Pradhan Mantri Vaya Vandana Yojana (PMVVY).
 

PMVVY is a retirement and pension scheme that is operated and managed by the Life Insurance Corporation of India (LIC), the largest life insurance provider in India. The PMVVY scheme was available for sale up to 31st March, 2023. Here are all the details you may want to know about the scheme.</p>

          </IonCardContent>
        </IonCard>

        {/* Buttons */}
      <IonButton
  expand="block"
  className="detail-btn primary"
  onClick={() =>
    window.open(
      "https://cleartax.in/s/pradhan-mantri-vaya-vandana-yojana-pmvvy",
      "_blank"
    )
  }
>
  📘 Learn More
</IonButton>

        <IonButton
          expand="block"
          className="detail-btn success"
          onClick={() => history.push('/govt/practice')}
        >
          🧪 Practice Application
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default SchemeDetail;