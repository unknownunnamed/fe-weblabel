import React from "react";
import { Container } from "react-bootstrap";
import CardDashboard from "../../../components/cardDashboard";
import Title from "../../../components/title";

const Dashboard = () => {
  return <Container className="mt-3">
    <Title title="Dashboard" />
    <div className="row">
      <div className="col-md-4 p-2">
        <CardDashboard title="Total Berita" body="1000" />
      </div>
      <div className="col-md-4 p-2">
        <CardDashboard title="Total User Label" body="10" />
      </div>
      <div className="col-md-4 p-2">
        <CardDashboard title="Total Hasil Label Berita" body="1000" />
      </div>
    </div>
  </Container>;
};

export default Dashboard;
