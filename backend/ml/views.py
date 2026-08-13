from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ml.services.prediction_service import PredictionService
from ml.services.recommendation_service import RecommendationService

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def weight_prediction_view(request):
    user = request.user
    client_current_weight = request.query_params.get('current_weight')
    
    prediction = PredictionService.get_weight_prediction(user, client_current_weight)
    
    if prediction is None:
        return Response({"error": "Prediction unavailable. Please ensure your profile is complete."}, status=503)
        
    return Response(prediction)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def workout_recommendation_view(request):
    user = request.user
    client_current_weight = request.query_params.get('current_weight')
    
    recommendation = RecommendationService.get_workout_recommendation(user, client_current_weight)
    
    if not recommendation:
        return Response({"error": "Unable to generate recommendation. Please ensure your profile is complete."}, status=503)
        
    return Response(recommendation)
