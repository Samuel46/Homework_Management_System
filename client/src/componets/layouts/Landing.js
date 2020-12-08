import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



function Landing({
  isAuthenticated
}) {

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="overflow-hidden">
      {/* Loader Start*/}
      <div className="loader">
        {/* Loader Content Wrapper Start */}
        <div className="loader_content">
          {/* Loader Logo Start */}
          <div className="loader-logo-container">
            <h3>Homewoek<br />App</h3>
            <div className="loader-caption slideInUp">
              <span className="loading-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </span>
            </div>
          </div>
          {/* Loader Logo End */}
        </div>
        {/* Loader Content Wrapper Start */}
        <div className="loader_background" />
        {/* Loader Morphing Shape Start */}
        <div className="loader_shape">
          <svg className="loader-transition-shape" width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path className="loader-morphing-path" d="M-22.4-87.7c-8.3,95.9,56.9,71.1,216.6,79c189.3,9.4,264.6-2.6,431.3-0.8c187.6,2,331.6-9.3,528.2-0.2c443.7,20.5,435.1-61.8,368.6-188.1C1455.9-324.1,34.5-746.7-22.4-87.7z" />
          </svg>
        </div>
        {/* Loader Morphing Shape End */}
      </div>
      {/* Loader End*/}
      {/* Custom HTML Start*/}
      {/* Menu Button Start */}
      <div className="menu-button">
        <a href="#" id="menu-trigger" className="menu-trigger">
          <span />
        </a>
        {/* Menu Button Morphing Shape Start */}
        <svg className="menu-btn-morphing-object" width="100%" height="100%" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
          <path className="menu-btn-morphing-path" d="M49.8,29.3c0,13.3-14.9,20.5-28.2,20.5S0.8,38.6,0.8,25.4S15.9,0.2,29.2,0.2S49.8,16,49.8,29.3z" />
        </svg>
        {/* Menu Button Morphing Shape End */}
      </div>
      {/* Menu Button Start */}
      {/* Navigation Start*/}
      <div className="navigation">
        {/* Menu Content Wrapper Start */}
        <div className="navigation_content">
          {/* Menu Close Button Start */}
          <a href="#" id="menu-close" className="navigation_close" />
          {/* Menu Close Button End */}
          {/* Menu Logo Start */}
          {/* Menu Logo End */}
          {/* Menu Content Start */}
          <div className="menu-wrapper">
            <nav>
              {/* Menu Start*/}
              <ul className="menu" id="menu">
                <li data-menuanchor="main">
                  <a href="#main">Home</a>
                </li>
                <li data-menuanchor="about">
                  <a href="#about">About US</a>
                </li>
                <li data-menuanchor="features">
                  <a href="#features">Register School</a>
                </li>
              </ul>
              {/* Menu End*/}
            </nav>
            {/* Socials Start*/}
            <ul className="menu-socials">
              <li>
                <a className href="https://twitter.com/" target="_blank">
                  <i className="icon ion-social-twitter" />
                </a>
              </li>
              <li>
                <a className href="https://github.com/" target="_blank">
                  <i className="icon ion-social-github" />
                </a>
              </li>
              <li>
                <a className href="https://www.facebook.com/" target="_blank">
                  <i className="icon ion-social-facebook" />
                </a>
              </li>
            </ul>
            {/* Socials End*/}
          </div>
          {/* Menu Content End */}
        </div>
        {/* Menu Content Wrapper End */}
        <div className="navigation_background" />
        {/* Menu Morphing Shape Start */}
        <div className="navigation_shape">
          <svg className="menu-transition-shape" width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <path className="menu-morphing-path" d="M-22.4-87.7c-8.3,95.9,56.9,71.1,216.6,79c189.3,9.4,264.6-2.6,431.3-0.8c187.6,2,331.6-9.3,528.2-0.2c443.7,20.5,435.1-61.8,368.6-188.1C1455.9-324.1,34.5-746.7-22.4-87.7z" />
          </svg>
        </div>
        {/* Menu Morphing Shape End */}
      </div>
      {/* Navigation End*/}
      {/* Fullpage.js Sections Start*/}
      <div id="fullpage">
        {/* Main Section Start*/}
        <div className="section fp-auto-height-responsive main-section" data-anchor="main">
          {/* Main Section Background Start*/}
          <div className="main-section_background">
            <svg className="main-background-shape" width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none">
              <path className="main-background-path" d="M-60.3,409.8c0,0,391.5-127.3,699.1,69C943,673,1423.5,734.1,1720.6,413.1s601.4,2.7,547.4-306.3
           s-2076.2-363-2076.2-363l-450,372L-60.3,409.8z" />
              <path className="main-background-path" d="M-185,1003c40-274,382-198,562-124s762,234,1028,80s584-78,704,58s54,370-260,344s-528-192-1038-146
            S-254.4,1478.2-185,1003z" />
            </svg>
          </div>
          {/* Main Section Background End*/}
          {/* Logo Start */}
          {/* Logo End */}
          {/* Main Section Content Start */}
          <div className="main-section_content fullheight">
            <div className="container-fluid p-0 fullheight">
              <div className="row no-gutters fullheight">
                {/* Main Section Intro Start */}
                <div className="col-12 col-xl-5 main-section_intro fullheight">
                  {/* Main Headline Start */}
                  <div className="headline">
                    <h1>Classroom <br />solutions</h1>
                    <span className="divider" />
                    <p>Outstanding management
                    </p>
                    <div className="btn-holder">
                      <Link to="/login" className="btn btn-light" id="notify-trigger">
                        <span className="btn-caption">Log in</span>
                        <span className="icon ion-android-send" />
                      </Link>
                      <Link to="/register" className="btn btn-outline-light">
                        <span className="btn-caption">Register</span>
                        <span className="icon ion-ios-arrow-forward" />
                      </Link>
                    </div>
                  </div>
                  {/* Main Headline End */}
                </div>
                {/* Main Section Intro End */}
                {/* Main Section Media Start */}
                <div className="col-12 col-xl-7 main-section_media fullheight">
                  {/* Homescreen Illustration Start */}
                  <div className="illustration-holder fullheight">
                    <div className="illustration">
                      <svg className="home-svg-1" width="100%" height="100%" viewBox="0 0 1080 894" style={{ enableBackground: 'new 0 0 1080 894' }} xmlSpace="preserve">
                        {/* Background Morphing Object Object */}
                        <path id="home-morphing-path-1" className="sundown" d="M1009.6,511.6c0,218.7-263.4,380.6-500.5,380.6S26.7,626.5,26.7,407.8S370.3,18.5,607.4,18.5S1009.6,292.9,1009.6,511.6z" />
                        {/* Small Bottom Static Object */}
                        <path id="home-static-path" className="turquoiseblue" d="M1056.5,708.1c0-169.8-144.4-160.4-236.4-160.4s-233.4,24-233.4,119.5
                      s56.5,215.5,148.5,215.5c47.4,0,104.2-67.3,174.3-100.6C975.6,750.6,1056.5,829.2,1056.5,708.1z" />
                        {/* Foreground Morphing Object (Morphing Path with Image) */}
                        <g>
                          {/* Morphing Object with Image */}
                          <defs>
                            <path id="home-morphing-path-2" d="M1070.2,472.6c0,218.7-317.4,389.1-554.5,389.1S9.1,800.7,9.1,582.1S195.7,13,432.8,13S1070.2,253.9,1070.2,472.6z" />
                          </defs>
                          <clipPath id="home-morphing-clippath">
                            <use xlinkHref="#home-morphing-path-2" style={{ overflow: 'visible' }} />
                          </clipPath>
                          <g transform="matrix(1 0 0 1 1.862645e-09 0)" style={{ clipPath: 'url(#home-morphing-clippath)' }}>
                            {/* Put Your Image Here in xlink:href="../path/to/image.jpg" Property */}
                            <image style={{ overflow: 'visible' }} width={1500} height={1242} xlinkHref="assets/images/backgrounds/home.png" transform="matrix(0.7198 0 0 0.7198 -2.581610e-02 -0.3868)" />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  {/* Homescreen Illustration End */}
                </div>
                {/* Main Section Media End */}
              </div>
            </div>
          </div>
          {/* Main Section Content End*/}
          {/* Socials Start */}
          <div className="socials">
            <ul>
              <li>
                <a className href="https://twitter.com/" target="_blank">
                  <i className="icon ion-social-twitter" />
                </a>
              </li>
              <li>
                <a className href="https://github.com/" target="_blank">
                  <i className="icon ion-social-github" />
                </a>
              </li>
              <li>
                <a className href="https://www.facebook.com/" target="_blank">
                  <i className="icon ion-social-facebook" />
                </a>
              </li>
            </ul>
          </div>
          {/* Socials End */}
          {/* Credits Start */}
          <div className="credits">
            <p><a href="#">Homework App</a> 2020 all rights reserved</p>
          </div>
          {/* Credits Start */}
        </div>
        {/* Main Section End*/}
      </div>
    </div>
  )
}


Landing.propType = {
  isAuthenticated: PropTypes.bool,

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
