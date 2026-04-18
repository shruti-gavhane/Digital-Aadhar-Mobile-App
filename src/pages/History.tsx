import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent
} from "@ionic/react";
import { useContext } from "react";
import { HistoryContext } from "../context/HistoryContext";
import { AppContext } from '../context/AppContext';
import { t, Language } from '../services/translations';
const History: React.FC = () => {
  const { history } = useContext(HistoryContext);
const { lang, speak } = useContext(AppContext) as {
  lang: Language;
  speak: (text: string) => void;
};
  const avgRisk =
    history.length > 0
      ? Math.round(
          history.reduce((sum: number, item: any) => sum + item.risk, 0) /
            history.length
        )
      : 0;

  return (
    <IonPage>
      <IonContent className="ion-padding">

        <h2>📊 Scan Analytics</h2>

        <h3>Total Scans: {history.length}</h3>
        <h3>Average Risk: {avgRisk}%</h3>

        {history.map((item: any, i: number) => (
          <IonCard key={i}>
            <IonCardContent>
              <p><b>Message:</b> {item.message}</p>
              <p><b>Risk:</b> {item.risk}%</p>
              <p><b>Date:</b> {item.date}</p>
            </IonCardContent>
          </IonCard>
        ))}

      </IonContent>
    </IonPage>
  );
};

export default History;