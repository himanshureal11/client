import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './404.module.scss'

function PageNotFound() {
    return (
        <section className={Styles.page_404}>
            <div>
                <div>
                    <div>
                        <div>
                            <div className={Styles.four_zero_four_bg}>
                                <h1>404</h1>
                            </div>
                            <div className={Styles.contant_box_404}>
                                <h3>
                                    Look like you're lost
                                </h3>
                                <p>the page you are looking for not available !</p>    
                                <Link to={'/'} className={Styles.link_404}>Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound 