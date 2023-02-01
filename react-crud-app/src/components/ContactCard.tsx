import { FC } from 'react';
import { Row, Col } from 'react-grid-system';
import './ContactCard.css';

interface ContactCardProps {
  avatar: string;
  name: string;
  id: string;
  index: number;
  onRowClick: (id: string) => void;
}

export const ContactCard: FC<ContactCardProps> = ({
  avatar,
  name,
  id,
  index,
  onRowClick,
}) => {
  return (
    <Row
      className={index % 2 === 0 ? 'light-row' : 'dark-row'}
      onClick={() => {
        onRowClick(id);
      }}
    >
      <Col sm={1}>
        <div
          style={{
            width: '50px',
            backgroundImage: `url(${avatar})`,
            height: '50px',
            backgroundSize: 'cover',
            borderRadius: '50%',
            margin: '10px 10px 10px 0',
          }}
        />
      </Col>
      <Col>
        <h2
          style={{
            fontSize: 20,
            marginTop: 24,
          }}
        >
          {name}
        </h2>
      </Col>
    </Row>
  );
};
