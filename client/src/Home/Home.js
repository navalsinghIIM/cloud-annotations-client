import React, { useCallback, useEffect, useRef, useState } from 'react'
import { InlineLoading } from 'carbon-components-react'

import styles from './Home.module.css'
import windowDark from './window-dark-compressed.png'
import video from './trim.webm'
import video2 from './trim.mp4'
import { useGoogleAnalytics } from 'googleAnalyticsHook'

// ffmpeg -i output.webm -c copy -t 00:00:10.5 trim.webm
// ffmpeg -i trim.webm -vf loop=60:1:0,setpts=N/FRAME_RATE/TB -cpu-used 1 pause2.webm
// ffmpeg -i final.mov -c:v libvpx-vp9 -b:v 0 -crf 30 -pass 1 -an -f webm /dev/null && \
// ffmpeg -i final.mov -c:v libvpx-vp9 -b:v 0 -crf 30 -pass 2 -c:a libopus output.webm
const Home = ({ attemptedPage }) => {
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)

  useGoogleAnalytics('home')

  console.log(attemptedPage)
  const encodedState = encodeURIComponent(attemptedPage)

  const handleClick1 = useCallback(() => {
    window.location.href = `/auth/login?state=${encodedState}`
    setLoading1(true)
  }, [encodedState])

  const handleClick2 = useCallback(() => {
    window.location.href = `/auth/login?state=${encodedState}`
    setLoading2(true)
  }, [encodedState])

  const videoRef = useRef(null)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <header className={styles.titleBar}>
        <a href="/" className={styles.title}>
          <span className={styles.titlePrefix}>IBM</span>&nbsp;&nbsp;Cloud
          Annotations
        </a>
        <nav className={styles.mainLinks}>
          <a className={styles.link} href="https://cloud.annotations.ai/docs">
            Docs
          </a>
          <a
            className={styles.link}
            href="https://cloud.annotations.ai/workshops"
          >
            Workshops
          </a>
          <a className={styles.link} href="https://cloud.annotations.ai/demos">
            Demos
          </a>
          <a className={styles.link} href="https://cloud.annotations.ai/sdks">
            SDKs
          </a>
        </nav>

        <a
          className={styles.outlink}
          href="https://ibm.biz/cloud-annotations-developer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>IBM Developer</div>
          <svg
            className={styles.outlinkIcon}
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Open resource"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
          >
            <path d="M26 28H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9v2H6v20h20v-9h2v9a2 2 0 0 1-2 2z"></path>
            <path d="M21 2v2h5.59L18 12.59 19.41 14 28 5.41V11h2V2h-9z"></path>
          </svg>
        </a>

        <a
          className={styles.outlink}
          href="https://github.com/cloud-annotations"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>GitHub</div>
          <svg
            className={styles.outlinkIcon}
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Open resource"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
          >
            <path d="M26 28H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9v2H6v20h20v-9h2v9a2 2 0 0 1-2 2z"></path>
            <path d="M21 2v2h5.59L18 12.59 19.41 14 28 5.41V11h2V2h-9z"></path>
          </svg>
        </a>

        {loading1 ? (
          <div className={styles.loading}>
            <InlineLoading description="Loading" success={false} />
          </div>
        ) : (
          <div className={styles.button} onClick={handleClick1}>
            Log in
          </div>
        )}
      </header>
      <main className={styles.contentWrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.bigText}>Cloud Annotations</div>
          <div className={styles.subText}>
            A fast, easy and collaborative open source image annotation tool for
            teams and individuals.
          </div>
          <div className={styles.buttonsWrapper}>
            {loading2 ? (
              <div className={styles.loading}>
                <InlineLoading description="Loading" success={false} />
              </div>
            ) : (
              <div className={styles.button} onClick={handleClick2}>
                Continue with IBM Cloud
              </div>
            )}
            <a
              className={styles.buttonSecondary}
              href="https://cloud.annotations.ai/docs"
            >
              Documentation
            </a>
          </div>
        </div>
        <div className={styles.videoWrapper}>
          <img className={styles.image} src={windowDark} alt="" />
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={video} type="video/webm" />
            <source src={video2} type="video/mp4" />
          </video>
        </div>
      </main>
    </div>
  )
}

export default Home
