import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function DentistStage() {
    const dentistList = [
        {
            id: 1,
            dentistName: 'Kalen',
            description: 'Get your hair cut by our professional stylists.',
            duration: '1 hour'
        },
        {
            id: 2,
            dentistName: 'Kanat',
            description: 'Pamper yourself with a relaxing manicure session.',
            duration: '45 minutes'
        },
        {
            id: 3,
            dentistName: 'Taboo',
            description: 'Enjoy a relaxing pedicure session.',
            duration: '45 minutes'
        },
        {
            id: 4,
            dentistName: 'Young',
            description: 'Relax with a full body massage.',
            duration: '1 hour'
        },
    ];
    
    const [showDentist, setShowDentist] = useState(false);
    return(
        <div className='stageContainer'>
            <div className='stageHeader'>
                <h2 className='stageTitle'>Dentist</h2>
                <FontAwesomeIcon 
                    onClick={() => setShowDentist(!showDentist)} 
                    icon={faCaretDown} 
                    className='toggleButton'
                />
            </div>
            {showDentist && (
                <div className='serviceList d-flex flex-column justify-content-between'>
                    {dentistList.map(dentist => (
                        <div key={dentist.id} className='serviceItem'>
                            <h4>{dentist.dentistName}</h4>
                            <p><strong>Description:</strong> {dentist.description}</p>
                            <p><strong>Duration:</strong> {dentist.duration}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}