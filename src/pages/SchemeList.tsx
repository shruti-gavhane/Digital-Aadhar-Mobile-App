import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon
} from "@ionic/react";

import { useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { t, Language } from "../services/translations";

import { chevronForwardOutline } from "ionicons/icons";

import "./SchemeList.css";

const SchemeList: React.FC = () => {
  const history = useHistory();
  const location = useLocation<any>();

  const { lang, speak } = useContext(AppContext) as {
    lang: Language;
    speak: (text: string) => void;
  };

  // ✅ Get category from previous page
  const category = location.state?.category;

  // ✅ Schemes data
  const schemes: any = {
  student: [
    {
      name: "National Scholarship Scheme",
      desc: "Scholarship for students"
    },
    {
      name: "AICTE Pragati Scholarship",
      desc: "Support for girl students"
    },
    {
      name: "Post Matric Scholarship",
      desc: "Financial aid after 10th"
    },
    {
      name: "INSPIRE Scholarship",
      desc: "Encourages science students"
    }
  ],

  farmer: [
    {
      name: "PM Kisan Yojana",
      desc: "Financial support for farmers"
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      desc: "Crop insurance scheme"
    },
    {
      name: "Soil Health Card Scheme",
      desc: "Soil quality improvement"
    },
    {
      name: "e-NAM",
      desc: "Online agriculture market"
    }
  ],

  senior: [
    {
      name: "PM Vaya Vandana Yojana",
      desc: "Pension scheme for senior citizens"
    },
    {
      name: "Indira Gandhi National Old Age Pension",
      desc: "Monthly pension support"
    },
    {
      name: "Senior Citizen Savings Scheme",
      desc: "Secure investment plan"
    },
    {
      name: "Varishta Pension Bima Yojana",
      desc: "Guaranteed pension scheme"
    }
  ],

  health: [
    {
      name: "Ayushman Bharat Yojana",
      desc: "Health insurance for families"
    },
    {
      name: "Jan Arogya Yojana",
      desc: "Free medical coverage"
    },
    {
      name: "National Health Mission",
      desc: "Healthcare improvement program"
    },
    {
      name: "PM Jan Aushadhi Scheme",
      desc: "Affordable medicines"
    }
  ],

  jobs: [
    {
      name: "PM Kaushal Vikas Yojana",
      desc: "Skill development training"
    },
    {
      name: "MGNREGA",
      desc: "Rural employment guarantee"
    },
    {
      name: "Startup India",
      desc: "Support for startups"
    },
    {
      name: "Stand-Up India",
      desc: "Loans for entrepreneurs"
    }
  ]
};

  // ❌ No fallback → only selected category
  const filteredSchemes = category ? schemes[category] || [] : [];

  return (
    <IonPage>
      <IonContent className="scheme-page">

        {/* Header */}
        <div className="scheme-header">
          <h2>🏛 Government Schemes</h2>
          <p>Explore benefits available for you</p>
        </div>

        {/* Scheme Cards */}
   {filteredSchemes.map((scheme: any, index: number) => (
  <IonCard
    key={index}
    className="scheme-card"
    button
    onClick={() =>
      history.push("/govt/detail", { scheme })
    }
  >
    <IonCardContent className="scheme-content">

      <div>
        <h3>{scheme.name}</h3>
        <p>{scheme.desc}</p>
      </div>

      <IonIcon icon={chevronForwardOutline} />

    </IonCardContent>
  </IonCard>
))}

      </IonContent>
    </IonPage>
  );
};

export default SchemeList;