
import React from 'react';
import './Team.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Dip from '../image/Dip.jpg';
import adi from '../image/adi.jpg';
import harsh from '../image/harsh (2).jpg';
import dhondi from '../image/dhondi.jpeg';

const Team = () => {
  const teamMembers = [
    {
      name: 'Diptish Gohane',
      role: 'Project Leader',
      description: 'As a Computer Science Engineer with a passion for programming, I am constantly seeking new opportunities to expand my skills and make a meaningful contribution to the field. I am currently pursuing my B.Tech in Computer Science from MIT ADT University and have been actively involved in various technical projects and extracurricular activities.',
      image: Dip,
    },
    {
      name: 'Harsh Gupta',
      role: 'Web Developer',
      description: 'As a Computer Science Engineer with a passion for programming, I am constantly seeking new opportunities to expand my skills and make a meaningful contribution to the field. I am currently pursuing my B.Tech in Computer Science from MIT ADT University and have been actively involved in various technical projects and extracurricular activities.',
      image: harsh,
    },
    {
      name: 'Adrija Santra',
      role: 'Designer',
      description: 'As a Computer Science Engineer with a passion for programming, I am constantly seeking new opportunities to expand my skills and make a meaningful contribution to the field. I am currently pursuing my B.Tech in Computer Science from MIT ADT University and have been actively involved in various technical projects and extracurricular activities.',
      image: adi,
    },
    {
      name: 'Pradhayum Dhondi',
      role: 'Backend',
      description: 'As a Computer Science Engineer with a passion for programming, I am constantly seeking new opportunities to expand my skills and make a meaningful contribution to the field. I am currently pursuing my B.Tech in Computer Science from MIT ADT University and have been actively involved in various technical projects and extracurricular activities.',
      image: dhondi,
    },
  ];

  return (
    <div className="team-page">
      <Container>
        <Row className="team-header">
          <Col>
            <h1>MEET OUR TEAM</h1>
          </Col>
        </Row>
        <Row>
          {teamMembers.map((member, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="hacker-card">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <Card.Img variant="top" src={member.image} alt={member.name} />
                    </div>
                    <div className="flip-card-back">
                      <h5>{member.name}</h5>
                      <p>{member.role}</p>
                    </div>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle>{member.role}</Card.Subtitle>
                  <Card.Text>{member.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="team-footer">
        <p>&copy; 2024 by Diptish-World</p>
      </div>
    </div>
  );
};

export default Team;
