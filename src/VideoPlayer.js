import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useMachine } from '@xstate/react';
import { ArrowsAltOutlined, ShrinkOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { playerMachine } from './playerMachine'; // Import the machine

const VideoPlayer = () => {
  const [current, send] = useMachine(playerMachine);
  const [videoUrl, setVideoUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(true);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

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
      <Button className='playBtn' onClick={() => handleOpenModal('YOUR_VIDEO_URL')}><img className='playBtn_icon' src={'play.png'} alt='play-icon'/></Button>
      <Modal
        className='modal'
        title="Video Player"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
            <>
            <Button className='playerBtn' onClick={toggleFullScreen}>
              {isFullScreen ? <ShrinkOutlined className='playerIcon'/> : <ArrowsAltOutlined className='playerIcon'/>}
            </Button>
            <Button className='playerBtn' onClick={current.matches('playing') ? handlePause : handlePlay}>
              {current.matches('playing') ? <PauseOutlined className='playerIcon'/> : <CaretRightOutlined className='playerIcon'/>}
            </Button>
            </>
            
        ]}
        width={isFullScreen ? "1000px" : "700px"}
        height={isFullScreen ? "700px" : "300px"}
      >
        {current.matches('playing') || current.matches('paused') ? (
          <div>
            <ReactPlayer
              url={'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'}
              playing={current.matches('playing')}
              controls={false}
              onPause={handlePause}
              onPlay={handlePlay}
              centered="true"
              loop={true}
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
