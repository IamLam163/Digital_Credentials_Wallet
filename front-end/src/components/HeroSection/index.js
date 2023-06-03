import React, {useState}from 'react';
import Video from '../../videos/vedio.mp4';
import { HeroContainer, 
  HeroBg, 
  VideoBg, 
  HeroContent, 
  HeroH1,
  HeroP, 
  HeroBtnWrapper, 
  ArrowForward, 
  ArrowRight,
} from './HeroElements';
import { Button } from '../ButtonElement';

const HeroSection = () => {
  const [hover, setHover] = useState(false)

  const onHover = () => {
    setHover(!hover);
  }


  return (
    <div id='/home' >
    <HeroContainer>
      <HeroBg>
      <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
    <HeroContent style={{marginRight: '50px'}}>
        <HeroH1 >Digital  Wallet</HeroH1>
        <HeroP>
          No more worries about where to keep your documents.
          Keep  All of them safe and secure with us.
          We are here to help you keep your documents safe and secure.
          Accross all your devices.
        </HeroP>
        <HeroBtnWrapper>
        <Button to="signup" 
        onMouseEnter={onHover}
        onMouseLeave={onHover} 
        primary="true"
        dark='true'
        smooth={true}
        duration={500} 
          spy={true} 
          exact='true' 
          offset={-80} 
          activeClass='active'
        >
          Get started { hover ? <ArrowForward /> : <ArrowRight />}
        </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
    </div>
  )
}

export default HeroSection;
