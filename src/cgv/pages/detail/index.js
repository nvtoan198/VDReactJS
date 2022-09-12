import React, { useState, useEffect } from 'react';
import LayoutMovies from '../../components/Layout';
import { Row, Col, Skeleton, Image, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { apiMovies } from '../../services/movies';
import { helper } from '../../helpers/common';
import ModalVideo from 'react-modal-video';

import 'react-modal-video/css/modal-video.min.css';

const DetailPage = () => {
    const { id } = useParams() || { id: 0 }; // lay id phim
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState({});
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await apiMovies.getDataMovieById(id);
            if(!data.hasOwnProperty('status_code')){
                setDetail(data);
            }
            setLoading(false);
        }
        getData();
    }, [id]);

    if(loading){
        return (
            <LayoutMovies>
                <Skeleton active />
            </LayoutMovies>
        )
    }
    if(helper.isEmptyObject(detail) && !loading){
        return (
            <LayoutMovies>
                <h4>Khong co thong tin ve bo phim</h4>
            </LayoutMovies>
        )
    }

    return (
        <LayoutMovies>
            <Row>
                <Col span={8}>
                    <Image
                        src={`https://image.tmdb.org/t/p/w300${detail.poster_path}`}
                    />
                    <h2>{detail.title}</h2>
                </Col>
                <Col span={8}>
                    <p>{detail.overview}</p>
                    { detail.videos.results.length > 0 && (
                        <>
                            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={detail['videos']['results'][0]['key']} onClose={() => setOpen(false)} />
                            <Button type="primary" onClick={()=> setOpen(true)}> View Trailer</Button>
                        </>
                    )}    
                </Col>
                <Col span={8}>
                    
                </Col>
            </Row>
        </LayoutMovies>
    )
}
export default React.memo(DetailPage);