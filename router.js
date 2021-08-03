const express = require("express");
const router = express.Router();
const Juices = require("./model");

router.get("/getcleaned", async (req, res) => {
  try {
    const juices = await Juices.getCleaned();

    res.status(200).json(juices);
  } catch (err) {
    res.status(500).send("ERROR");
  }
});

router.get('/getall', async (req, res) => {
    try {
        const all = await Juices.getAll()

        res.status(200).json(all)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/cleaning", async (req, res) => {
  try {
    const brands = await Juices.getAllBrands();
    const flavors = await Juices.getAllFlavors();
    const sizes = await Juices.getAllSizes();

    brands.forEach(async(brand) => {
      await Juices.addCleaned({
        brand,
        flavor: '',
        size: '',
        nicotine: ''
      })
      flavors.forEach((flavor) => {
        sizes.forEach(async (size) => {
          // returns array of juices
          const items = await Juices.getSpecific(brand, flavor, size);

          const aggregate = {
            brand,
            flavor,
            size,
            nicotine: [],
          };

          items.forEach((item) => {
            aggregate.nicotine.push(item.nicotine);
          });
          if (aggregate.nicotine.length > 0) {
            await Juices.addCleaned(aggregate);
          }
        });
      });
    });

    res.status(200).send("Successfully cleaned");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/submit", async (req, res) => {
  try {
    req.body.forEach(async (juice) => {
        if (juice) {
            await Juices.add(juice);

        }
    });

    res.status(201).send("Successfully uploaded");
  } catch (error) {
    res.status(500).send("Error of some kind");
  }
});

router.delete("/clear", async (req, res) => {
  try {
    await Juices.removeAll();

    res.status(200).send("Databases cleared and ready for new process");
  } catch (error) {
    res.status(500).send("Oops");
  }
});

module.exports = router;
