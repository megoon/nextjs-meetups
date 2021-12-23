import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
const DUMMY_DATA = [
  {
    id: "m1",
    image: "https://www.kstdc.co/wp-content/uploads/2019/10/b3e.jpg",
    title: "Bangalore – The City of Diverse Existence",
    address:
      "The best way to travel to this city is either by train to Bangalore Railway station or by air to Bengaluru International airport",
  },
  {
    id: "m2",
    image: "https://www.kstdc.co/wp-content/uploads/2019/10/b3b.jpg",
    title: "Bandipur National Park – In Harmony with Nature",
    address:
      "This attraction is about 80 km from the Mysore railway station and about 220 km from the airport.",
  },
  {
    id: "m3",
    image: "https://www.kstdc.co/wp-content/uploads/2019/10/b3c.jpg",
    title: "Coorg – Queer but Captivating",
    address:
      "Coorg is about 106 km from Mangalore rail station and about 250 km from the airport.",
  },
];
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create your own network"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mueed:mueed@cluster0.ead6h.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const results = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: results.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
  };
}
export default HomePage;
