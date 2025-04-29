import server from "./server";
import colors from "colors";

server.listen(4000, () => {
  console.log(colors.italic.magenta("Listening server from port 4000"));
});
