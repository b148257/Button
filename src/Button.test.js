import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Button render', () => {
   test('size test', () => {
       const component = renderer.create(
           <div>
               <Button url={'/123'} size={'small'}/>
               <Button url={'/123'} size={'middle'}/>
               <Button url={'/123'} size={'big'}/>
           </div>
       );
       let tree = component.toJSON();
       expect(tree).toMatchSnapshot();
   });

    test('text test', () => {
        const component = renderer.create(
            <div>
                <Button url={'/123'} text={'发送文件到123'}/>
            </div>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

test('Button click test', () => {
    const wrapper = shallow(<Button url={'/123'} onGetData={()=>{}}/>);
    expect(wrapper.state().disabled).toBe(false);

    wrapper.find('button').simulate('click');
    expect(wrapper.state().disabled).toBe(true);
});

test('GET test', () => {
    const callback = (data) => {
        console.log(data);
        data = JSON.parse(data);
        expect(data.about).toBe('/about');
    };

    const wrapper = shallow(<Button url={'https://jsonip.com/'} onGetData={callback}/>);
    wrapper.find('button').simulate('click');
});