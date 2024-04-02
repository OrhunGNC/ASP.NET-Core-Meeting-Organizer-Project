import React, { useEffect, useState } from 'react'
import { Table, Button, Modal,Form,
  DatePicker,TimePicker ,Input ,
  Select, } from 'antd';
import axios from 'axios';
import dayjs from "dayjs";
const Tables = () => {
  const uri ="https://localhost:7018/api"
    const[meetings,setMeetings]=useState([]);
    const[names,setNames]=useState([]);
    const [personelNames,setPersonelNames]=useState([]);
    const [selectedDate,setSelectedDate]=useState("");
    const [open, setOpen] = useState(false);
    const[selectedTime,setSelectedTime]=useState('');
    const [openn, setOpenn] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [selectedPersonel,setSelectedPersonel]=useState("");
    const [form] = Form.useForm();
  const [formNew] = Form.useForm();
  const [deleteId,setDeleteId]=useState("");
  
    useEffect(()=>{
      fetch(`${uri}/Meeting`)
      .then(response=>response.json())
      .then(data=>setMeetings(data))
      .catch(err=>console.error(err));
    },[]);
    const fetchAgain=()=>{
      fetch(`${uri}/Meeting`)
      .then(response=>response.json())
      .then(data=>setMeetings(data))
      .catch(err=>console.error(err));
  }
    useEffect(()=>{
      fetch(`${uri}/Personel`)
      .then(response=>response.json())
      .then(data=>setPersonelNames(data))
      .catch(err=>console.error(err));
    },[]);
    const onChange = (value) => {
      const selectedValue = JSON.parse(value); 
      
      setSelectedPersonel(JSON.stringify(selectedValue.personelId));

    };
    const organizeMeeting =()=>{
      form
            .validateFields()
            .then((values)=>{
              const dateObject = selectedTime ? new Date(selectedTime) : null;

    dateObject.setUTCHours(dateObject.getUTCHours() + 3);


    const hours = dateObject.getUTCHours().toString().padStart(2, '0'); 
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0'); 
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    console.log(formattedTime); 

                const postRequest={
                    personelId:selectedPersonel,
                    meetingTopic:values.meetingTopic,
                    meetingDate:values.meetingDate,
                    meetingEnd:formattedTime,
                    participants:values.participants
                };
  
                axios
                .post(`${uri}/Meeting`,postRequest)
                .then((response)=>{
                    console.log("Başarıyla Gerçekleşti",response.data);
                    fetchAgain();
                    form.resetFields();
                    setSelectedPersonel("");
                    setSelectedPersonel(null);
                    setSelectedTime("");
                    setSelectedTime(null);
                    setOpen(false);
                    
                })
                .catch((error)=>{console.error(error);
                });
            })
            .catch((error)=>console.error(error));
          
    }
    const updateMeeting =()=>{
      formNew
      .validateFields()
      .then((values) => {
        console.log(values);
        const dateObject = selectedTime ? new Date(selectedTime) : null;

    dateObject.setUTCHours(dateObject.getUTCHours() + 3);


    const hours = dateObject.getUTCHours().toString().padStart(2, '0'); 
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0'); 
    const formattedTime = `${hours}:${minutes}:${seconds}`;
        const putRequest = {
          id: values.id,
          personelId:values.personelId,
                    meetingTopic:values.meetingTopic,
                    meetingDate:values.meetingDate,
                    meetingEnd:formattedTime,
                    participants:values.participants
        };
        console.log(putRequest);
        axios
          .put(`${uri}/Meeting`, putRequest)
          .then((response) => {
            console.log("Başarıyla Gerçekleşti", response.data);
            console.log(putRequest);
            fetchAgain();
            setSelectedDate("");
            setSelectedDate(null);
            setSelectedTime("");
            setSelectedTime(null);
            form.resetFields();
            setOpenNew(false);
          })
          .catch((error) => {
            console.error(error);
            console.log(putRequest);
          });
      })
      .catch((error) => console.error(error));
    }
    const filterOption = (input, option) =>
    option?.children?.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
    option?.label?.toLocaleLowerCase().includes(input.toLocaleLowerCase());
      const personelId = meetings.map(meeting => meeting.personelId);
  
      const fetchPersonelNameSurname = async (personelId) => {
          try {
              const response = await fetch(`${uri}/Personel/${personelId}`);
              const data = await response.json();
              setNames(data.personelName);
              return data.personelName;
          } catch (error) {
              console.error(error);
          }
      };
      useEffect(() => {
        const fetchData = async () => {
            const personelNamess = await Promise.all(meetings.map(meeting => fetchPersonelNameSurname(meeting.personelId)));
            setNames(personelNamess);
        };
        fetchData();
    }, [meetings]);
    const tableData=meetings.map((salary,index)=>({
      ...salary,
      personelName:names[index]
    }));
    const editMeeting =(record)=>{
      setOpenNew(true);
      console.log(dayjs(record.meetingEnd, "HH:mm:ss"))
      formNew.setFieldsValue({
        ...record,
        meetingDate:dayjs(record.meetingDate),
        meetingEnd:dayjs(record.meetingEnd, "HH:mm:ss")
      })
      setSelectedDate(record.meetingDate);
      setSelectedTime(dayjs(record.meetingEnd, "HH:mm:ss"));
    }
    const columns = [
        {
          title: 'Meeting ID',
          width: 100,
          dataIndex: 'id',
        },
        {
          title: 'Meeting Manager',
          width: 150,
          dataIndex: 'personelName',
        },
        {
          title: 'Meeting Topic',
          width:300,
          dataIndex: 'meetingTopic',
        },
        {
          title: 'Meeting Date',
          width:250,
          dataIndex: 'meetingDate',
        },
        {
          title: 'Meeting End Hour',
          width:150,
          dataIndex: 'meetingEnd',
        },
        {
          title: 'Participants',
          width:300,
          dataIndex: 'participants',
        },
        {
          title: 'Edit',
          fixed: 'right',
          width: 100,
          render: (record) => <Button type='primary' style={{backgroundColor:'green'}} onClick={()=>editMeeting(record)}>Update</Button>,
        },
        {
          title: 'Delete',
          width: 100,
          render: (record) => <Button type='primary' danger onClick={() => deleteModal(record)}>Delete</Button>,
        },
      ];
      const deleteModal=(record)=>{
        setDeleteId(record.id);
        console.log(deleteId);
        console.log(record);
        console.log(record.id);
        setOpenn(true);
      }
      const deleteContent =()=>{
        axios
      .delete(`${uri}/Meeting/${deleteId}`)
      .then((response) => {
        setDeleteId(null);
        setDeleteId("");
        setOpenn(false);
        fetchAgain();

        console.log("Successfull", response);
      })
      .catch((error) => {
        console.error(error);
      });
      }
      const [paginationSize, setPaginationSize] = useState(''); 


  const checkScreenSize = () => {
    const screenHeight = window.innerHeight;
    if (screenHeight>= 900) { 
      setPaginationSize(10); 
    } else {
      setPaginationSize(7); 
    }
  };
  useEffect(() => {
    checkScreenSize(); 
    window.addEventListener('resize', checkScreenSize); 
    return () => window.removeEventListener('resize', checkScreenSize); 
  }, []);
  return (
<>
<Button type="primary" className='addbutton'  style={{ width: "20%", marginBottom: "1%" }} onClick={()=>setOpen(true)}>Organize New Meeting</Button>
<Table
    columns={columns}
    dataSource={tableData}
    scroll={{
      x: 1300,
    }}
    pagination={{pageSize:paginationSize}}
    bordered
  />
<Modal
        title="Organize New Meeting"
        centered
        open={open}
        onOk={organizeMeeting}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        width={1000}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Meeting Manager"
            name="personelId"
            rules={[
              {
                required: true,
                message: "Please input a personel!",
              },
            ]}
          >
            <Select
            showSearch
            placeholder="Select a personel"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            value={selectedPersonel?selectedPersonel:null} 
            >
               {personelNames.map(personel=>(
      <Select.Option key={personel.id} value={JSON.stringify({
      personelId:personel.id
    })}>{personel.personelName}</Select.Option>
    ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Meeting Topic"
            name="meetingTopic"
            rules={[
              {
                required: true,
                message: "Please input the meeting topic!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Meeting Date"
            name="meetingDate"
            rules={[
              {
                required: true,
                message: "Please input the meeting date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Meeting End"
            name="meetingEnd"
            rules={[
              {
                required: true,
                message: "Please input the meeting date!",
              },
            ]}
          >
            <TimePicker value={selectedTime} onChange={value => setSelectedTime(value)} format="HH:mm:ss"/>
          </Form.Item>
          <Form.Item
            label="Participants"
            name="participants"
            rules={[
              {
                required: true,
                message: "Please input the participants!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>


      <Modal
        title="Update Meeting"
        centered
        open={openNew}
        onOk={updateMeeting}
        onCancel={() => {
          formNew.resetFields();
          setSelectedDate("");
            setSelectedDate(null);
            setSelectedTime("");
            setSelectedTime(null);
          setOpenNew(false);
        }}
        width={1000}
      >
        <Form
          form={formNew}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Meeting ID"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input the id!",
              },
            ]}
            hidden
          >
            <Input hidden/>
          </Form.Item>
          <Form.Item
            label="Meeting Manager"
            name="personelId"
            rules={[
              {
                required: true,
                message: "Please input a personel!",
              },
            ]}
          >
            <Input readOnly></Input>
          </Form.Item>
          <Form.Item
            label="Meeting Topic"
            name="meetingTopic"
            rules={[
              {
                required: true,
                message: "Please input the meeting topic!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Meeting Date"
            name="meetingDate"
            rules={[
              {
                required: true,
                message: "Please input the meeting date!",
              },
            ]}
            
          >
            <DatePicker value={selectedDate ?  selectedDate :null} />
          </Form.Item>
          <Form.Item
            label="Meeting End"
            name="meetingEnd"
            rules={[
              {
                required: true,
                message: "Please input the meeting date!",
              },
            ]}
          >
            <TimePicker value={selectedTime} onChange={value => setSelectedTime(value)} format="HH:mm:ss"/>
          </Form.Item>
          <Form.Item
            label="Participants"
            name="participants"
            rules={[
              {
                required: true,
                message: "Please input the participants!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Are you sure you want to cancel this meeting?"
        open={openn}
        onOk={deleteContent}
        onCancel={()=>{setOpenn(false);
        setDeleteId("");
      setDeleteId(null);}}
      >
        <p>This action cannot be undone!</p>
      </Modal>
</>

    
    
  )
}

export default Tables