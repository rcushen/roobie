import './../ComponentStyles.css'

import turtlenecks from '../../assets/images/turtlenecks.png'

const About = () => {
    return (
        <div className="content-container">
            <div className="about-container">
                <p>roobie is what we came up with after arguing over who knew the best spots. Nunc fringilla ullamcorper massa sed dictum. Fusce laoreet erat sed ultrices gravida. Mauris nec felis id risus pharetra viverra quis et ante.</p>
                <p>Fusce vestibulum eros eu tortor laoreet, sodales mattis dui efficitur. Aliquam mollis, orci sit amet semper lobortis, ante sem semper mauris, sit amet vulputate neque odio nec risus. Morbi euismod condimentum quam, facilisis dictum magna tempor id.</p>
                <p className="signoff">-Alex, Regina, Ryan, Grace and James</p>
                <img src={turtlenecks} alt="the roobie team"/>
            </div>
        </div>
    )
}

export default About;