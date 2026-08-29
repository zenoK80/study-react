// part1 미션
import TestMission from './part1/01_TestMission';
import ReactRenderingProcess from './part1/02_react_rendering_process';
import Hello from './part1/03_Hello';
import Greeting from './part1/04_Greeting';
import ProfileHeader from './part1/05_ProfileHeader';

// Part2 미션
import Cafeteria from './part2/01_Cafeteria';
import ShoppingCart from './part2/02_ShoppingCart';
import TicketBooking from './part2/03_TicketBooking';

function App() {
  return (
    <div>
      <ProfileHeader name="Yongsu" age={20} country="Korea" />
    </div>
  );
}

export default App;
