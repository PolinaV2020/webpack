import("lodash").then((_) => {
  console.log(_.random(0, 42, true));
});

async function start() {
  return await Promise.resolve("async is working");
}

start().then(console.log);
