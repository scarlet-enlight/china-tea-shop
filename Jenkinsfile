pipeline {
  agent {
    label 'docker-agent'
  }

  stages {
    stage('Checkout') {
      steps {
        // Not nessesary for multibranch
        checkout scm
      }
    }

    stage('Build Services') {
      steps {
        // sh 'ls -R .'

        // Build backend and frontend
        sh 'docker compose -f docker-compose.yml build'
      }
    }
    

    stage('Run Tests') {
      steps {
        sh '''
          set -e

          docker compose -f docker-compose.yml up -d

          for i in {1..10}; do
            if docker compose exec -T backend curl -sf http://localhost:5000/healthcheck > /dev/null; then
              echo "✅ Backend is up!"
              break
            fi
            echo "⏳ Waiting for backend..."
            sleep 2
          done

          echo "🚀 Running tests..."
          docker compose -f docker-compose.yml exec -T backend pytest tests --maxfail=1 --disable-warnings -q

          echo "🧹 Tearing down containers..."
          docker compose -f docker-compose.yml down
        '''
      }
    }

    stage('Push Images') {
        when { branch 'main' }
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'docker-token',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {
                sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker compose -f docker-compose.yml push
                '''
            }
        }
    }
  }

  post {
    always {
      // Clean workspace
      cleanWs()
    }
  }
}