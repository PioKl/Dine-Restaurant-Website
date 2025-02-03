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
          heading={"Family Gathering"}
          description={
            "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all."
          }
          menuOptions={["Family Gathering", "Special Events", "Social Events"]}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
