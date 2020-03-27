import React from 'react'

const About = () => (
  <div>
    <h3>About</h3>
    <p>This app was built using webpack-rails-react and generated with rails g webpack_rails_react:install --router --redux</p>
    <p>If you just type /about into the url the route will not be found unless you sync rails router with the client router.  The best way to do this is to send all unmatched routes to your root route and let the client router take over</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada lorem et libero vehicula elementum. Sed convallis fermentum quam nec accumsan. Morbi aliquet est nec metus tristique mattis sed nec nunc. Sed vitae sem ut lectus molestie vulputate. Quisque tempus efficitur ligula ac ullamcorper. Mauris tincidunt, neque id malesuada gravida, mauris est faucibus enim, sed tincidunt tellus velit eu risus. In tempus magna nec massa tincidunt, quis laoreet elit accumsan. Cras ornare aliquet sem, sollicitudin tincidunt enim cursus mollis. Etiam ut nisl in leo condimentum blandit in id felis. Nam malesuada, purus tristique egestas elementum, lectus libero efficitur lacus, ut eleifend libero est id enim. Etiam id pretium sapien. Morbi eleifend molestie vestibulum. Proin ornare vulputate vestibulum.
    </p>
  </div>
  )

export default About;