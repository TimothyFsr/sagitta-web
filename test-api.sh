#!/bin/bash

# Test script for Sagitta License API
# Run this after starting the dev server: npm run dev

API_URL="http://localhost:3000/api"
TEST_KEY="SGTA-TEST-DEMO-0001"
TEST_HARDWARE_ID="a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"

echo "🧪 Testing Sagitta License API"
echo "================================"
echo ""

# Test 1: Activate
echo "📝 Test 1: Activating license..."
ACTIVATE_RESPONSE=$(curl -s -X POST "$API_URL/activate" \
  -H "Content-Type: application/json" \
  -d "{\"key\":\"$TEST_KEY\",\"hardwareId\":\"$TEST_HARDWARE_ID\"}")

echo "$ACTIVATE_RESPONSE" | jq .

# Extract token
TOKEN=$(echo "$ACTIVATE_RESPONSE" | jq -r '.token')

if [ "$TOKEN" != "null" ]; then
  echo "✅ Activation successful!"
  echo ""
  
  # Test 2: Validate with token
  echo "📝 Test 2: Validating with token..."
  VALIDATE_RESPONSE=$(curl -s -X POST "$API_URL/validate" \
    -H "Content-Type: application/json" \
    -d "{\"token\":\"$TOKEN\"}")
  
  echo "$VALIDATE_RESPONSE" | jq .
  
  SUCCESS_VAL=$(echo "$VALIDATE_RESPONSE" | jq -r '.success')
  if [ "$SUCCESS_VAL" = "true" ]; then
    echo "✅ Token validation successful!"
  else
    echo "❌ Token validation failed!"
  fi
  echo ""
  
  # Test 2b: Validate with key + hardwareId (Swift app method)
  echo "📝 Test 2b: Validating with key + hardwareId..."
  VALIDATE2_RESPONSE=$(curl -s -X POST "$API_URL/validate" \
    -H "Content-Type: application/json" \
    -d "{\"key\":\"$TEST_KEY\",\"hardwareId\":\"$TEST_HARDWARE_ID\"}")
  
  echo "$VALIDATE2_RESPONSE" | jq .
  
  SUCCESS_VAL2=$(echo "$VALIDATE2_RESPONSE" | jq -r '.success')
  if [ "$SUCCESS_VAL2" = "true" ]; then
    echo "✅ Key validation successful!"
  else
    echo "❌ Key validation failed!"
  fi
  echo ""
  
  # Test 3: Try to activate again (should fail)
  echo "📝 Test 3: Attempting duplicate activation (should fail)..."
  DUPLICATE_RESPONSE=$(curl -s -X POST "$API_URL/activate" \
    -H "Content-Type: application/json" \
    -d "{\"key\":\"$TEST_KEY\",\"hardwareId\":\"$TEST_HARDWARE_ID\"}")
  
  echo "$DUPLICATE_RESPONSE" | jq .
  
  ERROR=$(echo "$DUPLICATE_RESPONSE" | jq -r '.error')
  if [ "$ERROR" = "ALREADY_ACTIVATED" ]; then
    echo "✅ Duplicate activation blocked correctly!"
  else
    echo "❌ Duplicate activation should have been blocked!"
  fi
  echo ""
  
  # Test 4: Deactivate
  echo "📝 Test 4: Deactivating license..."
  DEACTIVATE_RESPONSE=$(curl -s -X POST "$API_URL/deactivate" \
    -H "Content-Type: application/json" \
    -d "{\"key\":\"$TEST_KEY\",\"hardwareId\":\"$TEST_HARDWARE_ID\"}")
  
  echo "$DEACTIVATE_RESPONSE" | jq .
  
  SUCCESS=$(echo "$DEACTIVATE_RESPONSE" | jq -r '.success')
  if [ "$SUCCESS" = "true" ]; then
    echo "✅ Deactivation successful!"
  else
    echo "❌ Deactivation failed!"
  fi
  echo ""
  
  # Test 5: Validate after deactivation (should fail)
  echo "📝 Test 5: Validating after deactivation (should fail)..."
  VALIDATE3_RESPONSE=$(curl -s -X POST "$API_URL/validate" \
    -H "Content-Type: application/json" \
    -d "{\"key\":\"$TEST_KEY\",\"hardwareId\":\"$TEST_HARDWARE_ID\"}")
  
  echo "$VALIDATE3_RESPONSE" | jq .
  
  SUCCESS_VAL3=$(echo "$VALIDATE3_RESPONSE" | jq -r '.success')
  if [ "$SUCCESS_VAL3" = "false" ]; then
    echo "✅ Validation correctly failed after deactivation!"
  else
    echo "❌ Validation should have failed!"
  fi
  
else
  echo "❌ Activation failed!"
  echo "$ACTIVATE_RESPONSE"
fi

echo ""
echo "================================"
echo "✨ Tests complete!"
