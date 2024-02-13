import Modal from 'react-bootstrap/Modal';
import { washingtonImages } from '../pages/washington/images-array';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function ImageModal({ imgIndex, show, close }: { imgIndex: number | null; show: boolean; close: () => void }) {
  const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
  const modalLinkSecond = useMemo(() => '=s4000?authuser=0', []);

  const [index, setIndex] = useState(imgIndex);

  const [viewState, setViewState] = useState({
    mobileView: false,
  });
  const { mobileView } = viewState;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 910 ? setViewState((prevState) => ({ ...prevState, mobileView: true })) : setViewState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  useEffect(() => {
    setIndex(imgIndex);
  }, [imgIndex]);

  const changePhoto = useCallback(
    (next: boolean) => {
      if (index) {
        if (next && washingtonImages[index + 1]) {
          setIndex(index + 1);
        } else if (!next && washingtonImages[index - 1]) {
          setIndex(index - 1);
        } else {
          setIndex(1);
        }
      }
    },
    [index]
  );

  return (
    <div>
      <Modal show={show} onHide={close} centered size={mobileView ? 'sm' : undefined} style={mobileView ? { maxWidth: '28rem' } : {}}>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body>
          {imgIndex && index && <img src={`${modalLinkFirst}${washingtonImages[index].img_id}${modalLinkSecond}`} alt="Modal Pic" className="m-1" height={mobileView ? '50%' : '100%'} width="100%" />}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between">
            <button className="btn" onClick={() => changePhoto(false)}>
              Previous
            </button>
            <button className="btn" onClick={() => changePhoto(true)}>
              Next
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

//receive index of image array
