import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { BugOutlined } from '@ant-design/icons';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px'
        }}>
          <Result
            status="error"
            title="Произошла ошибка"
            subTitle="К сожалению, что-то пошло не так. Попробуйте перезагрузить страницу или обратитесь к администратору."
            icon={<BugOutlined style={{ color: '#ff4d4f' }} />}
            extra={[
              <Button type="primary" key="reload" onClick={this.handleReload}>
                Перезагрузить страницу
              </Button>,
              <Button key="reset" onClick={this.handleReset}>
                Попробовать снова
              </Button>,
            ]}
          >
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div style={{ 
                marginTop: '20px', 
                textAlign: 'left',
                backgroundColor: '#f5f5f5',
                padding: '16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}>
                <details>
                  <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
                    Детали ошибки
                  </summary>
                  <div>
                    <strong>Ошибка:</strong> {this.state.error && this.state.error.toString()}
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <strong>Stack trace:</strong>
                    <pre>{this.state.errorInfo.componentStack}</pre>
                  </div>
                </details>
              </div>
            )}
          </Result>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
