import { AbsoluteFill, useCurrentFrame, Img, staticFile } from 'remotion';

const scenes = [
  { image: 'onboarding1.png', title: 'GrowTogether', subtitle: 'By The Good Acre' },
  { image: 'onboarding2.png', title: 'Select Your Crops', subtitle: 'Hmong Eggplant, Thai Basil, and more' },
  { image: 'onboarding3.png', title: 'Choose Your Goals', subtitle: 'Increase revenue, improve fulfillment' },
  { image: 'onboarding4.png', title: 'Pick Your Language', subtitle: 'English, Hmong, Spanish, Somali' },
  { image: 'onboarding5.png', title: 'Tech Comfort Level', subtitle: 'We meet you where you are' },
  { image: 'home.png', title: 'Your Home Feed', subtitle: 'TGA updates, market alerts, community' },
  { image: 'community.png', title: 'Community', subtitle: 'Connect with Minnesota farmers' },
  { image: 'insights.png', title: 'Business Insights', subtitle: 'Cost calculator, fulfillment, orders' },
  { image: 'education.png', title: 'Learn', subtitle: 'Wholesale readiness, certifications' },
  { image: 'profile.png', title: 'Profile', subtitle: 'Your farm, your stats' },
];

const MyComposition = () => {
  const frame = useCurrentFrame();
  const SCENE_DURATION = 90;
  const sceneIndex = Math.min(Math.floor(frame / SCENE_DURATION), scenes.length - 1);
  
  const currentScene = scenes[sceneIndex];
  const imageSrc = staticFile(currentScene.image);
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#3a4d1f' }}>
      <Img 
        src={imageSrc}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </AbsoluteFill>
  );
};

export const composition = {
  id: 'TGAComposition',
  durationInFrames: scenes.length * 90,
  fps: 30,
  width: 390,
  height: 844,
  component: MyComposition
};

export default composition;
