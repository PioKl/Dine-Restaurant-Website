import Hero from "./components/Hero";
import RestaurantHighlights from "./components/RestaurantHighlights";
import MenuHighlights from "./components/MenuHighlights";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Hero />
      <main>
        <RestaurantHighlights
          option={"first"}
          heading={"Enjoyable place for all the family"}
          description={
            "Our relaxed surroundings make dining with us a great experience for everyone. We can even arrange a tour of the farm before your meal."
          }
        />

        <RestaurantHighlights
          option={"second"}
          heading={"The most locally sourced food"}
          description={
            "All our ingredients come directly from our farm or local fishery. So you can be sure that you’re eating the freshest, most sustainable food."
          }
        />
        <MenuHighlights />
        <RestaurantHighlights
          option={"third"}
          menuOptions={[
            {
              heading: "Family Gathering",
              description:
                "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all.",
            },
            {
              heading: "Special Events",
              description:
                "Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you. We’ll be sure to mark your special date with an unforgettable meal.",
            },
            {
              heading: "Social Events",
              description:
                "Are you looking to have a larger social event? No problem! We’re more than happy to cater for big parties. We’ll work with you to make your event a hit with everyone.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
