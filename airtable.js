const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Expo Token");

exports.createExpoToken = async (token) => {
  try {
    const findExpoToken = await table
      .select({ filterByFormula: `token="${token}"` })
      .firstPage();

    if (findExpoToken.length !== 0) {
      const expoToken = findExpoToken.map((record) => {
        return { ...record.fields };
      });

      return expoToken;
    } else {
      table.create(
        [
          {
            fields: { token },
          },
        ],
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function (record) {
            console.log(record.getId());
          });
        }
      );
      return "creating";
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAllExpoTokens = async () => {
  return new Promise((resolve, reject) => {
    const expoTokens = [];

    table.select().eachPage(
      function page(records, fetchNextPage) {
        records.forEach((record) => {
          expoTokens.push(record.fields.token);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          reject(err);
        } else {
          resolve(expoTokens);
        }
      }
    );
  });
};
