import React from 'react';
import ReactPlayer from 'react-player';
import { useMachine } from '@xstate/react';
import { Modal, Button } from 'antd';
import { playerMachine } from './playerMachine'; // Import the machine

const VideoPlayer = () => {
  const [current, send] = useMachine(playerMachine);
  const [videoUrl, setVideoUrl] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleOpenModal = (url) => {
    setVideoUrl(url);
    send({type: 'OPEN_MODAL'});
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    send({type: 'CLOSE_MODAL'});
    setIsModalVisible(false);
  };

  const handlePlay = () => send({type: 'PLAY'});
  const handlePause = () => send({type: 'PAUSE'});

  return (
    <>
      <Button className='playerBtn' onClick={() => handleOpenModal('YOUR_VIDEO_URL')}><img className='playerBtn_icon' src={'play.png'} alt='play-icon'/></Button>
      <Modal
        title="Video Player"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
            <Button onClick={current.matches('playing') ? handlePause : handlePlay}>
                {current.matches('playing') ? 'Pause' : 'Play'}
            </Button>
        ]}
        width="1000px"
        height="700px"
      >
        {current.matches('playing') || current.matches('paused') ? (
          <div>
            <ReactPlayer
              url={'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'}
              playing={current.matches('playing')}
              controls={false}
              onPause={handlePause}
              onPlay={handlePlay}
              centered
              width="100%"
              height="100%"
            />
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default VideoPlayer;
