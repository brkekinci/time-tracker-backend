export const getData = async () => {
  const today = new Date().toISOString().split("T")[0];
  // const start_date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 Days ago
  console.log("Pulling Data ", new Date().toISOString());
  // console.log('Date specs: ', today, start_date);
  let errors = [];

  DAILY.destroy({
    where: {
      date: today,
    },
  })
    .then(async (num) => {
      console.log("Cleared " + num + " day rows");
      PROJECT.destroy({
        where: {
          day_id: {
            [Op.eq]: null,
          },
        },
      })
        .then((num) => console.log("Cleared " + num + " project rows"))
        .catch((err) => console.log(err));

      LANGUAGE.destroy({
        where: {
          day_id: {
            [Op.eq]: null,
          },
        },
      })
        .then((num) => console.log("Cleared " + num + " project rows"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      USER.findAll({ raw: true })
        .then(async (users) => {
          // console.log(users);

          for await (const user of users) {
            console.log(user.name);

            axios
              .get(
                `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`,
                {
                  headers: { Authorization: `Basic ${user.api_key_base64}` },
                }
              )
              .then(async (res) => {
                for await (const day of res.data.data) {
                  DAILY.create({
                    date: day.range.date,
                    date_start: day.range.start,
                    date_end: day.range.end,
                    total_text: day.grand_total.text || "0",
                    total_digital: day.grand_total.digital || "0:00:00",
                    total_seconds: day.grand_total.total_seconds || 0,
                    user_id: user.user_id,
                  })
                    .then(async (daily) => {
                      for await (const project of day.projects) {
                        PROJECT.create({
                          name: project.name,
                          date_text: project.text,
                          percent: project.percent,
                          digital: project.digital,
                          total_seconds: project.total_seconds,
                          day_id: daily.day_id,
                        })
                          .then((data) =>
                            console.log("Added Project:", data.name)
                          )
                          .catch((err) => {
                            errors.push(err);
                            console.log(err);
                          });
                      }

                      for await (const language of day.languages) {
                        LANGUAGE.create({
                          name: language.name,
                          date_text: language.text,
                          percent: language.percent,
                          digital: language.digital,
                          total_seconds: language.total_seconds,
                          day_id: daily.day_id,
                        })
                          .then((data) =>
                            console.log("Added Language:", data.name)
                          )
                          .catch((err) => {
                            errors.push(err);
                            console.log(err);
                          });
                      }
                    })
                    .catch((err) => {
                      errors.push(err);
                      console.log(err);
                    });
                }
              })
              .catch((err) => {
                {
                  errors.push(err);
                  console.log(err);
                }
              });
          }
          return { users, errors };
        })
        .then(({ users, errors }) => {
          if (errors.length > 0) {
            notifyFunction({ users, errors });
          }
        });
    });
};
