import React, {useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import CardDashboard from "../../../components/cardDashboard";
import Title from "../../../components/title";
import services from "../../../process/services";

const Dashboard = () => {
  const [dataBerita, setDataBerita] = useState(0);
  const [dataUser, setDataUser] = useState(0);
  const [dataLabel, setDataLabel] = useState(0);

  useEffect(() => {
    const getBerita = async () => {
      const berita = await services.getBerita();
      setDataBerita(berita.data.data.length);
    }

    const getLabel = async () => {
      const label = await services.getLabel();
      setDataLabel(label.data.data.length);
    }

    const getUser = async () => {
      const user = await services.getUserLabel();
      setDataUser(user.data.data.length);
    }

    getLabel();
    getUser();
    getBerita();
  }, []);


  return <Container className="mt-3">
    <Title title="Dashboard" />
    <div className="row">
      <div className="col-md-4 p-2">
        <CardDashboard title="Total Berita" body={dataBerita} />
      </div>
      <div className="col-md-4 p-2">
        <CardDashboard title="Total User Label" body={dataUser} />
      </div>
      <div className="col-md-4 p-2">
        <CardDashboard title="Total Hasil Label Berita" body={dataLabel} />
      </div>
    </div>
  </Container>;
};

export default Dashboard;
