import {
  Button,
} from '@chakra-ui/react'
import { collection, addDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { firestore } from '../config/firebase';

import { Container } from '../components/Container'
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const { user } = useAuth()
  
  const clock = async (type) => {
    try {
      const now = Date.now()
      const docRef = await addDoc(collection(firestore, "checklogs"), {
        email: user.email,
        coordinate: new GeoPoint(0, 0),
        image_url: 'https://ngorder-1.sgp1.digitaloceanspaces.com/7/products/kaos-harta-tahta-1665990804705.jpg',
        note: 'asdasda',
        timestamp: new Timestamp(Math.floor(now / 1000), 0),
        type
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Container height="100vh">
      <Container
        flexDirection="row"
        width="full"
        maxWidth="3xl"
        py={3}
      >
        <Button
          variant="outline"
          colorScheme="green"
          rounded="button"
          flexGrow={1}
          mx={2}
          width="full"
          onClick={() => clock('CLOCK_IN')}
        >
          Clock In
        </Button>
        <Button
          variant="solid"
          colorScheme="green"
          rounded="button"
          flexGrow={3}
          mx={2}
          width="full"
          onClick={() => clock('CLOCK_OUT')}
        >
          Clock Out
        </Button>
      </Container>
    </Container>
  )
}

export default Index
