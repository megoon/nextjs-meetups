import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import Head from "next/head";

function MeetupDetailsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupsData.title}</title>
        <meta name="description" content={props.meetupsData.description} />
      </Head>
      <MeetupDetails
        url={props.meetupsData.url}
        title={props.meetupsData.title}
        address={props.meetupsData.address}
        description={props.meetupsData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mueed:mueed@cluster0.ead6h.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://mueed:mueed@cluster0.ead6h.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupsData: {
        id: selectedMeetup._id.toString(),
        url: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailsPage;
