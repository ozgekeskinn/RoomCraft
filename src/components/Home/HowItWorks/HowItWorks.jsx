import { Fragment } from "react";
import { ArrowRight } from "lucide-react";

import howItWorksSteps from '../../../data/howItWorksSteps';
import HowItWorksStep from './HowItWorksStep';
import './HowItWorks.css';

export default function HowItWorks(){
    return (
        <section className='how-it-works'>
            <div className="page-container how-it-works__container">

                <div className="section-header how-it-works__header">
                    <h2 className="section-title how-it-works__title">
                        Nasıl Çalışır?
                    </h2>
                </div>

                <div className="how-it-works__flow">
                    {howItWorksSteps.map((feature,index) => (
                        <Fragment key={feature.id}>
                            <HowItWorksStep
                                step={feature.step}
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                            />

                            {index < howItWorksSteps.length - 1 && (
                                <div
                                    className="how-it-works__connector"
                                    aria-hidden="true"
                                >
                                    <span className="how-it-works__connector-line" />

                                    <ArrowRight
                                        size={18}
                                        strokeWidth={1.8}
                                    />
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}