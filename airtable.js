const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Expo Token");

exports.getExpoToken = async (token) => {
  const selected = await new Promise((resolve, reject) => {
    table.select({ filterByFormula: `token="${token}"` }).eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          const expotoken = record.fields.token;
          if (expotoken) {
            resolve(expotoken);
          }
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          reject(err);
        } else {
          resolve(undefined);
        }
      }
    );
  });

  return selected;
};

exports.createExpoToken = async (token) => {
  try {
    const expoToken = await this.getExpoToken(token);

    if (expoToken) {
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

exports.getAllExpoToken = async () => {
  return new Promise((resolve, reject) => {
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
