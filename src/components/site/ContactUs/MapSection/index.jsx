import React from "react";
import styled from "styled-components";
import { Row, Col } from "../../../../styles/common/GridSystem";

const MapSection = () => {
  return (
    <MapWrapper>
      <Row>
        <Col xs={12}>
          <MapContainer>
            <iframe
              title="HotelShop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.650568764408!2d49.86709267604011!3d40.40924375526407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0459618c4f%3A0x93069d13e2f4ae43!2sHotelStore!5e0!3m2!1sen!2saz!4v1713449500000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapContainer>
        </Col>
      </Row>
    </MapWrapper>
  );
};

export default MapSection;

const MapWrapper = styled.section`
  padding: 0;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
