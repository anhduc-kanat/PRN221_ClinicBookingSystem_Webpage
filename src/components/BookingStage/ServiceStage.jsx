import React, { useState } from 'react';
import './StageStyle.css';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ServiceStage({ onSelectService}) {
   
    const serviceList = [
        {
            id: 1,
            serviceName: 'Haircut',
            description: 'Get your hair cut by our professional stylists.',
            duration: '1 hour'
        },
        {
            id: 2,
            serviceName: 'Manicure',
            description: 'Pamper yourself with a relaxing manicure session.',
            duration: '45 minutes'
        },
        {
            id: 3,
            serviceName: 'Pedicure',
            description: 'Enjoy a relaxing pedicure session.',
            duration: '45 minutes'
        },
        {
            id: 4,
            serviceName: 'Massage',
            description: 'Relax with a full body massage.',
            duration: '1 hour'
        },
    ];

    // State to track whether services are visible or hidden
    const [showServices, setShowServices] = useState(false);
    const [showDentists, setShowDentists] =useState(false);

    const handleExtendService = () => {
        setShowServices(!showServices);
        if (showServices) {
            setShowDentists(false);
        }
    }

    return (
        <div className='stageContainer'>
            <div className='stageHeader'>
                <h2 className='stageTitle'>Services</h2>
                <FontAwesomeIcon 
                    onClick={handleExtendService} 
                    icon={faCaretDown} 
                    className='toggleButton'
                />
            </div>
            {showServices && (
                <div className='serviceList d-flex flex-column justify-content-between'>
                    {serviceList.map(service => (
                        <div key={service.id} className='serviceItem' onClick={() => {onSelectService(service.serviceName); setShowServices(false);}}>
                            <h4>{service.serviceName}</h4>
                            <p><strong>Description:</strong> {service.description}</p>
                            <p><strong>Duration:</strong> {service.duration}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
