import { Row, Col } from 'react-bootstrap';
import sotreItems from '../data/items.json';
import {StoreItem} from '../components/StoreItem';

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {sotreItems.map(item => {
          return (
            <Col key={item.id}>
              <StoreItem {...item}/>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
