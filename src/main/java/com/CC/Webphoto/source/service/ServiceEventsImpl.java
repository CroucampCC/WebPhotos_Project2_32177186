package com.CC.Webphoto.source.service;

import com.CC.Webphoto.source.model.Events;
import com.CC.Webphoto.source.repository.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ServiceEventsImpl implements ServiceEvents{

    @Autowired
    private EventsRepository eventsRepository;

    @Override
    public Events saveEvents(final Events events){
        return eventsRepository.save(events);
    }

    @Override
    public Long numberOfEvents(){
        return eventsRepository.count();
    }

    @Override
    public List<Events> findAllEvents(){
        return eventsRepository.findAll();
    }
}
